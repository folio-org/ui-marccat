/**
 * @author: Christian Chiama
 *
 * @format
 */
import * as React from 'react';
import { findDOMNode } from 'react-dom';

type PrinterProviderProps = {
    copyStyles: bool;
    trigger: Function,
    content: Function,
    onBeforePrint: Function,
    onAfterPrint: Function,
    closeAfterPrint: bool,
    pageStyle: string,
    bodyClass: string,
    debug: bool;
};
type PrinterProviderState = {};

/**
 * Pass the children of a Route to the component that is responsible for rendering it.
 * This allows us to have a single route hierarchy, where the routing
 * components are responsible for marshalling data, and providing high
 * level layout:
 *
 *    // component.js
 *    <PrinterProvider
 *       trigger={() => <IconButton key="icon-gear" icon="gear" className={css.stripes__icon} />}
 *       content={() => this.componentRef} />
 *
 *    //component.js
 *    <Paneset static ref={(el) => this.componentRef = el}>...
 *
 *
 * will take all of the children of the top level `Route` component,
 * and pass them as the children of the `ParentRoute` component.
 */

export function injectProp<Props: {}>(Component: React.ComponentType<Props>, prop: Object): React.ComponentType<Props> {
  return function WrapperComponent(props: Props) {
    const printMenu = null;
    return <Component {...props} prop={prop}>{this.props.children}</Component>;
  };
}

export default class PrinterProvider extends React.Component<PrinterProviderProps, PrinterProviderState> {
  static defaultProps = {
    copyStyles: true,
    closeAfterPrint: true,
    bodyClass: '',
    debug: false
  };

  triggerPrint(target) {
    if (this.props.onBeforePrint) {
      this.props.onBeforePrint();
    }
    setTimeout(() => {
      if (!this.props.debug) {
        target.print();
        if (this.props.closeAfterPrint) {
          target.close();
        }
      }
    }, 500);
  }

  handlePrint = () => {
    const {
      content,
      copyStyles,
      onAfterPrint,
      pageStyle
    } = this.props;

    const printWindow = window.open('', 'Print', 'status=yes, toolbar=yes, scrollbars=yes', 'false');

    if (onAfterPrint) {
      printWindow.onbeforeunload = onAfterPrint;
    }

    const contentEl = content();
    const contentNodes = findDOMNode(contentEl); // eslint-disable-line react/no-find-dom-node

    const imageNodes = [...contentNodes.getElementsByTagName('img')];
    const linkNodes = document.querySelectorAll('link[rel="stylesheet"]');

    this.imageTotal = imageNodes.length;
    this.imageLoaded = 0;

    this.linkTotal = linkNodes.length;
    this.linkLoaded = 0;

    const markLoaded = (type) => {
      if (type === 'image') {
        this.imageLoaded++;
      } else if (type === 'link') { this.linkLoaded++; }

      if (this.imageLoaded === this.imageTotal && this.linkLoaded === this.linkTotal) {
        this.triggerPrint(printWindow);
      }
    };

    [...imageNodes].forEach((child) => {
      if (/^data:/.test(child.src)) {
        child.crossOrigin = 'anonymous';
      }
      child.setAttribute('src', child.src);
      child.onload = markLoaded.bind(null, 'image');
      child.onerror = markLoaded.bind(null, 'image');
      child.crossOrigin = 'use-credentials';
    });

    if (copyStyles !== false) {
      const headEls = document.querySelectorAll('style, link[rel="stylesheet"]');
      [...headEls].forEach(node => {
        const doc = printWindow.contentDocument || printWindow.document;
        const newHeadEl = doc.createElement(node.tagName);

        if (node.textContent) {
          newHeadEl.textContent = node.textContent;
        } else if (node.innerText) {
          newHeadEl.innerText = node.innerText;
        }
        const attributes = [...node.attributes];
        attributes.forEach(attr => {
          let nodeValue = attr.nodeValue; // eslint-disable-line prefer-destructuring

          if (
            attr.nodeName === 'href' &&
            /^https?:\/\//.test(attr.nodeValue) === false &&
            /^blob:/.test(attr.nodeValue) === false
          ) {
            const relPath = attr.nodeValue.substr(0, 3) === '../'
              ? document.location.pathname.replace(/[^/]*$/, '')
              : '/';

            nodeValue = nodeValue.replace(/\/+/, '');
            nodeValue = document.location.protocol + '//' + document.location.host + relPath + nodeValue;
          }

          newHeadEl.setAttribute(attr.nodeName, nodeValue);
        });

        if (node.tagName === 'LINK') {
          newHeadEl.onload = markLoaded.bind(null, 'link');
          newHeadEl.onerror = markLoaded.bind(null, 'link');
        }

        printWindow.document.head.appendChild(newHeadEl);
      });
    }

    if (document.body.className) {
      const bodyClasses = document.body.className.split(' ');
      bodyClasses
        .filter(item => item)
        .map(item => printWindow.document.body.classList.add(item));
    }

    if (this.props.bodyClass.length) {
      printWindow.document.body.classList.add(this.props.bodyClass);
    }

    const defaultPageStyle = pageStyle === undefined
      ? '@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }'
      : pageStyle;

    const styleEl = printWindow.document.createElement('style');
    styleEl.appendChild(printWindow.document.createTextNode(defaultPageStyle));

    printWindow.document.head.appendChild(styleEl);
    printWindow.document.body.innerHTML = contentNodes.outerHTML;

    if (this.imageTotal === 0 || copyStyles === false) {
      this.triggerPrint(printWindow);
    }
  }

  render() {
    return React.cloneElement(this.props.trigger(), {
      ref: (el) => this.triggerRef = el,
      onClick: this.handlePrint
    });
  }
}

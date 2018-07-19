/**
 * @author: Christian Chiama <Be Solution S.r.l>
 *
 * @format
 * @flow
 */
import React from 'react';
import { findDOMNode } from 'react-dom';

type MARCcatPrinterProps = {
    copyStyles: bool;
    trigger: Function,
    content: Function,
    onBeforePrint: Function,
    onAfterPrint: Function,
    closeAfterPrint: bool,
    triggerComponent: React.Component<*>;
    pageStyle: string,
    bodyClass: string,
    debug: bool;
};
type MARCcatPrinterState = {};

export const PrinterProvider = ({ ref, children }) => {
  return (
    <MARCcatPrinter ref={ref}>
    {...children}
    </MARCcatPrinter>);
};

export default class MARCcatPrinter extends React.Component<MARCcatPrinterProps, MARCcatPrinterState> {
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
    const contentNodes = findDOMNode(contentEl);

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

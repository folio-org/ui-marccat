<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
 <xsl:output method="text"/>

 <xsl:template match="record">

  <xsl:text>000</xsl:text>
  <xsl:text> </xsl:text>
  <xsl:text>  </xsl:text>
  <xsl:text> </xsl:text>
  <xsl:text> </xsl:text>
  <xsl:text> </xsl:text>
  <xsl:value-of select="leader"/>
  <xsl:text>&#x0D;&#x0A;</xsl:text>

  <xsl:for-each select="./controlfield">
   <xsl:value-of select="@tag"/>
   <xsl:text> </xsl:text>
   <xsl:text>  </xsl:text>
   <xsl:text> </xsl:text>
   <xsl:text> </xsl:text>
   <xsl:text> </xsl:text>
   <xsl:value-of select="."/>
   <xsl:text>&#x0D;&#x0A;</xsl:text>
  </xsl:for-each>

  <xsl:for-each select="./datafield">
   <xsl:for-each select ="./subfield">
    <xsl:choose>
     <xsl:when test="position () = 1">
      <xsl:value-of select="../@tag"/>
      <xsl:text> </xsl:text>
      <xsl:value-of select="../@ind1"/>
      <xsl:value-of select="../@ind2"/>
      <xsl:text> </xsl:text>
      <xsl:value-of select="@code"/>
      <xsl:text> </xsl:text>
      <xsl:value-of select="."/>
      <xsl:text>&#x0D;&#x0A;</xsl:text>
     </xsl:when>
     <xsl:otherwise>
      <xsl:text>   </xsl:text>
      <xsl:text> </xsl:text>
      <xsl:text>  </xsl:text>
      <xsl:text> </xsl:text>
      <xsl:value-of select="@code"/>
      <xsl:text> </xsl:text>
      <xsl:value-of select="."/>
      <xsl:text>&#x0D;&#x0A;</xsl:text>
     </xsl:otherwise>
    </xsl:choose>
   </xsl:for-each>
  </xsl:for-each>

 </xsl:template>

</xsl:stylesheet>


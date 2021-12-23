<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
		xmlns:fo="http://www.w3.org/1999/XSL/Format"
		xmlns:date="http://exslt.org/dates-and-times" 
		version="1.0">
	<xsl:output method="xml" indent="yes"/>
	<xsl:variable name="now" select="date:date-time()" />
	<xsl:variable name="fontFamily">Helvetica</xsl:variable>
	<xsl:variable name="server">http://192.168.2.26</xsl:variable>
	<xsl:decimal-format name="ziffer" decimal-separator="," grouping-separator="."/>
	<xsl:template match="export">
		<fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">

			<fo:layout-master-set>

				<fo:simple-page-master master-name="titel" page-height="29.7cm" page-width="21.0cm" 
												margin-left="2.5cm" 
												margin-right="1.5cm" 
												margin-top="1cm" 
												margin-bottom="0.5cm">              
					<fo:region-body region-name="body" />
				</fo:simple-page-master>

				<fo:simple-page-master master-name="first-page" page-height="29.7cm" page-width="21.0cm" 
												margin-left="2.5cm" 
												margin-right="1.5cm" 
												margin-top="1cm" 
												margin-bottom="0.5cm">
					<fo:region-body  margin-top="0.8cm" margin-bottom="1.0cm" />
					<fo:region-before region-name="regionBefore1" extent="1cm" />
					<fo:region-after region-name="regionAfter1" extent="1.0cm" />
				</fo:simple-page-master>

				<fo:simple-page-master 	master-name="default-page" page-height="29.7cm" page-width="21.0cm" 
												margin-left="2.5cm" 
												margin-right="1.5cm" 
												margin-top="1cm" 
												margin-bottom="1.3cm">
					<fo:region-body  margin-top="0.8cm" margin-bottom="1.0cm" />
					<fo:region-before region-name="regionBefore1" extent="1cm" />
					<fo:region-after region-name="regionAfter1" extent="1.3cm" />
				</fo:simple-page-master>

				<fo:simple-page-master master-name="last" page-height="29.7cm" page-width="21.0cm" 
												margin-left="2.5cm" 
												margin-right="1.5cm" 
												margin-top="1cm" 
												margin-bottom="0.5cm">              
					<fo:region-body region-name="body" />  
				</fo:simple-page-master>

				<fo:page-sequence-master master-name="cover">
					<fo:single-page-master-reference master-reference="titel" page-position="first" />
				</fo:page-sequence-master>

				<fo:page-sequence-master master-name="mainPart">
					<fo:repeatable-page-master-alternatives>
						<fo:conditional-page-master-reference master-reference="first-page" page-position="first" />
						<fo:conditional-page-master-reference master-reference="default-page" page-position="rest" />
					</fo:repeatable-page-master-alternatives>
				</fo:page-sequence-master>

				<fo:page-sequence-master master-name="end">
					<fo:single-page-master-reference master-reference="last" page-position="last" />
				</fo:page-sequence-master>


			</fo:layout-master-set>


			<fo:page-sequence master-reference="cover">
				<fo:flow flow-name="body" >    
					<fo:block font-family="{$fontFamily}" font-size="10pt" font-style="normal" font-weight="normal" line-height="14pt" text-decoration="none">
						<fo:table table-layout="fixed" space-after.optimum="2pt" >
							<fo:table-column column-width="11cm" />
							<fo:table-column column-width="6cm" />
							<fo:table-body>
								<fo:table-row >
									<fo:table-cell padding-top="2.0pt"  text-align="center" >
										<fo:block />
									</fo:table-cell>
									<fo:table-cell padding-top="2.0pt"  >
										<fo:block />
									</fo:table-cell>
								</fo:table-row>
							</fo:table-body>
						</fo:table>
						<fo:block 		text-align="center" start-indent="3.0pt" 
											padding-top="6.0cm"  color="#000000" font-family="{$fontFamily}" font-size="30.0pt" padding-after="1.0cm">
							<xsl:text>Micha's Rezeptesammlung</xsl:text>
						</fo:block>
					</fo:block>
					<fo:block font-family="{$fontFamily}" break-before="page" white-space-collapse="false"  linefeed-treatment="preserve"  start-indent="3.0pt" 
							color="#000000" font-size="24.0pt" padding-after="1.0cm">
							Inhaltsverzeichnis
					</fo:block>						

					<fo:block font-family="{$fontFamily}">
						<xsl:for-each select="/export/loc/tagtype">
							<xsl:sort select="tag/@name" lang="de" data-type="number"/>
							<fo:block text-align-last="left">
								<xsl:value-of select="@name" />
								<!--fo:basic-link internal-destination="{IDtt}">
									<xsl:value-of select="@name" />
									<fo:leader leader-pattern="dots"/>
									<fo:page-number-citation ref-id="{IDtt}"/>
								</fo:basic-link--> 
							</fo:block>
							<xsl:for-each select="tag">
								<xsl:sort select="recipe/@name" lang="de" data-type="number"/>
								<fo:block start-indent="20.0pt" text-align-last="left">
									<xsl:value-of select="@name" />
									<!--fo:basic-link internal-destination="{IDt}">
										<xsl:value-of select="@name" />
										<fo:leader leader-pattern="dots"/>
										<fo:page-number-citation ref-id="{IDt}"/>
									</fo:basic-link-->
								</fo:block>
								<xsl:for-each select="recipe">
									<fo:block start-indent="40.0pt" text-align-last="justify">
										<fo:basic-link internal-destination="{@id}r">
											<xsl:value-of select="@name" />
											<fo:leader leader-pattern="dots"/>
											<fo:page-number-citation ref-id="{@id}r"/>
										</fo:basic-link>
									</fo:block>
								</xsl:for-each>
							</xsl:for-each>
						</xsl:for-each>
					</fo:block>
				</fo:flow>
			</fo:page-sequence>  


			<xsl:for-each select="/export/rec/recipe">
				<xsl:sort select="@name" lang="de" />
				<fo:page-sequence master-reference="mainPart" > 
					<fo:static-content flow-name="regionBefore1">
						<fo:block line-height="14.0pt" white-space-collapse="false"  linefeed-treatment="preserve"  start-indent="3.0pt" text-align="start" color="#000000" 
							font-family="{$fontFamily}" font-size="14.0pt" font-weight="bold">
							<xsl:value-of disable-output-escaping="no" select="@name" />
						</fo:block>
						<fo:block space-before="0pt">
							<fo:leader leader-pattern="rule" rule-thickness="1.0pt" leader-length="17cm" color="#a6b3b3" />
						</fo:block>
					</fo:static-content>

					<fo:static-content flow-name="regionAfter1">
						<fo:block space-before="0pt">
							<fo:leader leader-pattern="rule" rule-thickness="1.0pt" leader-length="17cm" color="#a6b3b3" />
						</fo:block>
						<fo:block text-align="right" span="none" font-family="{$fontFamily}" font-size="10pt" >
							Seite <fo:page-number /> von <fo:page-number-citation ref-id="lastPage" /> 
						</fo:block>
					</fo:static-content>				


					<fo:flow flow-name="xsl-region-body"> 
						<fo:block  font-size="11" font-family="{$fontFamily}">
							<xsl:choose>
								<xsl:when test="position()!=last()">
									<fo:block  font-size="11" break-after="page">
										<xsl:call-template name="M1" />
									</fo:block>	
								</xsl:when>
								<xsl:otherwise>
									<fo:block  font-size="11" >
										<xsl:call-template name="M1" />
										<xsl:call-template name="LP" />
									</fo:block>	
								</xsl:otherwise>
							</xsl:choose>
						</fo:block>
					</fo:flow>
				</fo:page-sequence>
			</xsl:for-each>
		</fo:root>		
	</xsl:template>


	<xsl:template name="LP" >
		<fo:block id="lastPage" />
	</xsl:template >

	<xsl:template name="M1" >
		<fo:block span="none" id="{@id}r">
			<fo:block line-height="8.0pt" white-space-collapse="false"  linefeed-treatment="preserve" padding-top="1em" start-indent="3.0pt" text-align="start" color="#a6b3b3" 
				font-family="{$fontFamily}" font-size="6.0pt">
				<xsl:text>Quelle: </xsl:text><xsl:value-of select="source/name" />
				<xsl:if test="normalize-space(source/source_page)!=''"><xsl:text>; Seite: </xsl:text><xsl:value-of select="source/source_page" /></xsl:if>
				<xsl:if test="normalize-space(source/year)!=''"><xsl:text>; Veröffentlicht am: </xsl:text><xsl:value-of select="source/year" /></xsl:if>
				<xsl:if test="normalize-space(source/isbn)!=''"><xsl:text>; ISBN: </xsl:text><xsl:value-of select="source/isbn" /></xsl:if>
			</fo:block>
			<fo:block line-height="8.0pt" white-space-collapse="false"  linefeed-treatment="preserve"  start-indent="3.0pt" text-align="start" color="#a6b3b3" 
				font-family="{$fontFamily}" font-size="6.0pt">
				<xsl:text>Tags: </xsl:text>
				<xsl:for-each select="tags/tag">
					<xsl:if test="position() &gt; 1"><xsl:text>; </xsl:text></xsl:if>
					<xsl:value-of select="@name" />
				</xsl:for-each>
			</fo:block>
			<xsl:if test="image">
				<!--xsl:variable name="imageUrl" select="concat('http://michahannover.dyndns-ip.com:8080/rezepte/getImage.php?id=',@id)" /-->
				<xsl:variable name="imageUrl" select="image" />
				<fo:block text-align="left">
					<!-- <img src="data:image/png;base64,{.}"/> -->
					<fo:external-graphic src="data:image/png;base64,{image}" content-height="5cm" border-style="solid" border-width="1.0pt" border-color="#a6b3b3" background-color="#eeeeee" padding="3pt" />
				</fo:block>
			</xsl:if>
			<fo:table table-layout="fixed" >
				<fo:table-column column-width="5.5cm"/>
				<fo:table-column column-width="0.5cm"/>
				<fo:table-column column-width="11cm"/>
				<fo:table-body>
					<fo:table-row height="16.0pt">
						<fo:table-cell text-align="left">
							<fo:block line-height="12.0pt" white-space-collapse="false" linefeed-treatment="preserve" text-align="start" color="#000000" font-family="{$fontFamily}" font-size="10.0pt" font-weight="bold">
								<xsl:text>Für </xsl:text><xsl:value-of select="number" /><xsl:text> Portionen</xsl:text>
								<xsl:if test="normalize-space(number_comment)!=''">
									<xsl:text>, </xsl:text><xsl:value-of select="number_comment" />
								</xsl:if>
							</fo:block>
							<xsl:if test="normalize-space(nv_calories)!=''">
								<fo:block line-height="12.0pt" white-space-collapse="false" linefeed-treatment="preserve" text-align="start" color="#000000" font-family="{$fontFamily}" font-size="10.0pt" font-weight="bold">
									<xsl:text>Pro Portion: </xsl:text><xsl:value-of select="nv_calories" /><xsl:text> kcal</xsl:text>
								</fo:block>
							</xsl:if>
							<xsl:for-each select="parts/part">
								<xsl:choose>
									<xsl:when test="normalize-space(@name)!=''">
										<fo:block line-height="12.0pt" padding-top="0.3cm" white-space-collapse="false" linefeed-treatment="preserve" 
											text-align="start" color="#a6b3b3" font-family="{$fontFamily}" font-size="10.0pt" font-weight="bold">
											<xsl:value-of select="@name" />
										</fo:block>
									</xsl:when>
									<xsl:otherwise><xsl:text>Sonstige Zutaten</xsl:text></xsl:otherwise>
								</xsl:choose>
								<xsl:for-each select="ingredient">
									<fo:block line-height="12.0pt" padding-top="0.1pt" white-space-collapse="false" linefeed-treatment="preserve" text-align="start" color="#000000" font-family="{$fontFamily}" font-size="10.0pt">
										<xsl:variable name="quantity">
											<xsl:if test="normalize-space(@quantity)!=''"><xsl:value-of select="format-number(@quantity, '#,##', 'ziffer')" /></xsl:if>
										</xsl:variable>
										<xsl:value-of select="concat($quantity,' ', @unit_name,' ', .)" />
									</fo:block>
								</xsl:for-each>
							</xsl:for-each>
						</fo:table-cell>
						<fo:table-cell text-align="left">
							<fo:block><xsl:text> </xsl:text></fo:block>
						</fo:table-cell>
						<fo:table-cell text-align="left">
							<xsl:choose>
								<xsl:when test="count(todos/todo)>0">
									<xsl:for-each select="todos/todo">
										<fo:block line-height="12.0pt" padding-bottom="0.1cm" white-space-collapse="false" linefeed-treatment="preserve" 
											text-align="start" color="#000000" font-family="{$fontFamily}" font-size="10.0pt">
											<fo:inline font-size="14pt" font-weight="bold"><xsl:value-of select="@number" /><xsl:text>. </xsl:text></fo:inline><xsl:value-of select="." />
											<xsl:if test="@image">
												<xsl:variable name="imageUrl" select="@image" />
												<fo:block text-align="left">
													<fo:external-graphic src="{$imageUrl}" content-height="3cm" border-style="solid" border-width="1.0pt" border-color="#a6b3b3" background-color="#eeeeee" padding="3pt" />
												</fo:block>
											</xsl:if>
										</fo:block>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<fo:block><xsl:text> </xsl:text></fo:block>
								</xsl:otherwise>
							</xsl:choose>
						</fo:table-cell>
					</fo:table-row>
				</fo:table-body>
			</fo:table>
		</fo:block>
	</xsl:template>
	<xsl:template name="NeueSeite" >
		<fo:block break-after="page" font-size="1pt">
		&#160;
		</fo:block>
	</xsl:template>

</xsl:stylesheet>
<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" >
	<xsl:output method="xml" indent="yes" cdata-section-elements="dynamic-content"/>
	<xsl:strip-space elements="*"/>

	<xsl:template match="/">
		<!-- <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"> -->
			<xsl:apply-templates />
		<!-- </rss> -->
	</xsl:template>

	<!-- <xsl:template name="channel-title">
		<xsl:choose>
			<xsl:when test="/rss/channel/channel.properties/htmltitle/text()">
				<xsl:value-of select="/rss/channel/channel.properties/htmltitle"/>
			</xsl:when>
			<xsl:when test="/rss/channel/channel.properties/name/text()">
				<xsl:value-of select="/rss/channel/channel.properties/name"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="/rss/channel/channel.properties/url"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template> -->

	<!-- <xsl:template name="channel-description">
		<xsl:choose>
			<xsl:when test="/rss/channel/channel.properties/description/text()">
				<xsl:value-of select="/rss/channel/channel.properties/description"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="channel-title"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template> -->
	<xsl:key name="item" match="item" use="item.properties/articleid" />


	
	<xsl:template match="channel">
		
		<xsl:copy>
			<!-- <link>
				<xsl:value-of select="channel.properties/url"/>
			</link>
			<title>
				<xsl:call-template name="channel-title"/>
			</title>
			<description>
				<xsl:call-template name="channel-description"/>
			</description>
			<atom:link rel="self" type="application/rss+xml">
				<xsl:attribute name="href">
					<xsl:value-of select="channel.properties/rss"/>
				</xsl:attribute>
			</atom:link> -->
			
			<xsl:for-each select="item">
			 	<xsl:if test ="not(preceding::item.properties[articleid/text() = current()/item.properties/articleid/text()])">
		          	<item>       			
						<titleText>
							<xsl:value-of select="item.properties/title"/>
						</titleText>
						<redirectionUrl>
							<xsl:value-of select="item.properties/link"/>
						</redirectionUrl>
						<uid >
							<xsl:value-of select="item.properties/guid"/>
						</uid>
						<updateDate>
							<xsl:value-of select="item.properties/modifieddate"/>
						</updateDate>
						<!-- <source>
							<xsl:attribute name="url">
								<xsl:value-of select="/rss/channel/channel.properties/rss"/>
							</xsl:attribute>
							<xsl:call-template name="channel-title"/>
						</source> -->
			
						<!-- METADATOS -->
			            <!-- <xsl:for-each select="item.metadata/vocabulary//category[@set='1']">
			                    <category >
			                    	<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
			                    	<xsl:attribute name="vn"><xsl:value-of select="@vn"/></xsl:attribute>
			                    	<xsl:attribute name="vid"><xsl:value-of select="@vid"/></xsl:attribute>
			                       	<xsl:value-of select="@name"/>
			                    </category>
						</xsl:for-each> -->
						<!-- METADATOS -->
			
						<xsl:if test="root/dynamic-element/dynamic-element[@name='Document' and @type='document_library']/dynamic-content[text()]">
							<enclosure length="0" type="application/octet-stream">
								<xsl:attribute name="url">
									<xsl:value-of select="root/dynamic-element/dynamic-element[@name='Document' and @type='document_library']/dynamic-content"/>
								</xsl:attribute>
							</enclosure>
						</xsl:if>
			
						<xsl:choose>
							<xsl:when test="item.properties/productlist/text()">
								<xsl:processing-instruction name="php">if ( user_has_access_to_any_of_these_products( "<xsl:value-of select="item.properties/articleid"/>", array( <xsl:value-of select="item.properties/productlist"/> ), "<xsl:value-of select="item.properties/modifieddateiso"/>" ) === true ) {</xsl:processing-instruction>
									<xsl:call-template name="getFullDescription"/>
								<xsl:processing-instruction name="php">} else {</xsl:processing-instruction>
									<xsl:call-template name="getRestrictedDescription"/>
								<xsl:processing-instruction name="php">}</xsl:processing-instruction>
							</xsl:when>
							<xsl:otherwise>
								<xsl:call-template name="getFullDescription"/>
							</xsl:otherwise>
						</xsl:choose>
			
						<!-- Procesa las imágenes -->
						<xsl:for-each select="root/dynamic-element[dynamic-element[@name='_img-Binary_' and @type='document_library']]">
							<xsl:if test="dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/text()">
								<media:content medium="image">
									<!-- Ancho y Alto -->
									<xsl:if test="dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/@width">
										<xsl:attribute name="width">
											<xsl:value-of select="dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/@width"/>
										</xsl:attribute>
									</xsl:if>
									<xsl:if test="dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/@height">
										<xsl:attribute name="height">
											<xsl:value-of select="dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/@height"/>
										</xsl:attribute>
									</xsl:if>
									<!-- URL -->
									<xsl:attribute name="url">
										<xsl:value-of select="dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/text()"/>
									</xsl:attribute>
									<!-- Cutline -->
									<xsl:if test="dynamic-element[@name='Cutline']/dynamic-content/text()">
										<media:title><xsl:value-of select="dynamic-element[@name='Cutline']/dynamic-content/text()"/></media:title>
									</xsl:if>
								</media:content>
							</xsl:if>
						</xsl:for-each>
						<!-- Procesa los documentos como pdfs y videos -->
						<xsl:for-each select="root/dynamic-element[dynamic-element[@name='Document' and @type='document_library']]">
							<xsl:if test="dynamic-element[@name='Document' and @type='document_library']/dynamic-content/text()">
								<media:content>
									<!-- Atributos -->
									<xsl:if test="dynamic-element[@name='Extension' and @type='text']/dynamic-content/text()">
										<xsl:attribute name="type">
											<xsl:value-of select="dynamic-element[@name='Extension' and @type='text']/dynamic-content/text()"/>
										</xsl:attribute>
									</xsl:if>
									<!-- Recurso -->
									<xsl:attribute name="url">
										<xsl:value-of select="dynamic-element[@name='Document' and @type='document_library']/dynamic-content/text()"/>
									</xsl:attribute>
									<!-- Miniatura -->
									<xsl:if test="dynamic-element[@name='Preview' and @type='document_library']/dynamic-content/text()">
										<media:thumbnail>
											<xsl:attribute name="url">
												<xsl:value-of select="dynamic-element[@name='Preview' and @type='document_library']/dynamic-content/text()"/>
											</xsl:attribute>
										</media:thumbnail>
									</xsl:if>
								</media:content>
							</xsl:if>
						</xsl:for-each>
						<!-- Procesa los videos de youtube-->
						<xsl:for-each select="root/dynamic-element[@name='Youtube']">
							<xsl:if test="dynamic-content/text()">
								<media:content>
									<media:player>
										<!--  Atributos -->
										<xsl:attribute name="url">https://youtu.be/<xsl:value-of select="dynamic-content/text()"></xsl:value-of></xsl:attribute>
									</media:player>
								</media:content>
							</xsl:if>
						</xsl:for-each>
					
					</item>
				</xsl:if>
			</xsl:for-each>
		</xsl:copy>
	</xsl:template>
	
	<xsl:template name="getFullDescription">
		<mainText>
			<!-- Solo se añade el atributo en los elementos NO restringidos -->
			<!-- <xsl:attribute name="readingtime"/> -->
			
			<xsl:if test="root/dynamic-element/dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/text()">&lt;img src="<xsl:value-of select="root/dynamic-element/dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/text()"/>"&gt;</xsl:if>
			<xsl:apply-templates select="root/dynamic-element[@name='Text']/dynamic-content"/>
		</mainText>
	</xsl:template>
	
	<xsl:template name="getRestrictedDescription">
		<mainText>
			<xsl:if test="root/dynamic-element/dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/text()">&lt;img src="<xsl:value-of select="root/dynamic-element/dynamic-element[@name='_img-Binary_' and @type='document_library']/dynamic-content/text()"/>"&gt;</xsl:if>
			<xsl:call-template name="getFirstParagraph"><xsl:with-param name="value" select="root/dynamic-element[@name='Text']/dynamic-content"/></xsl:call-template>
		</mainText>
	</xsl:template>
	
	<xsl:template name="getFirstParagraph">
		<xsl:param name="value"/>
		<xsl:variable name="paragraph" select="substring-before($value, '&lt;/p&gt;')" />
		<xsl:value-of select="$paragraph"/><xsl:if test="string-length($paragraph)>0">&lt;/p&gt;</xsl:if>
	</xsl:template>
</xsl:stylesheet>

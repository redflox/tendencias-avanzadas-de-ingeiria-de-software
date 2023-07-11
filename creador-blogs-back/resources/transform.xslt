<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html"/>

<!-- Agregar el DOCTYPE y el encabezado -->
  <xsl:template match="/">
    <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>BLOG</title>
        <link rel="stylesheet" href="./css/main.css"/>
        <link rel="stylesheet" href="./css/font/flaticon.css"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&amp;family=Open+Sans&amp;family=Roboto+Slab&amp;display=swap" rel="stylesheet"/>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

<!-- HEADER -->
<xsl:template match="header">
  <header>
    <section id="redesSociales" class="header-icons-conteiner">
        <div class="icons">
            <xsl:apply-templates select="redesSociales/socialMedia"/>
        </div>
    </section>
    <nav id="navbar">
      <xsl:apply-templates select="navbar"/>
    </nav>
  </header>
</xsl:template>

<xsl:template match="socialMedia">
    <a href="{url}"><span class="fimanager flaticon-{icono}"></span></a>
</xsl:template>

<xsl:template match="navbar">  
  <section class="nav-logo-conteiner">
    <a href="{logo/url}"><img src="{logo/imagen}" alt=""/></a>
  </section>
  <section class="profile-link">
    <a href="{pages/url}">
      <xsl:value-of select="pages/nombre"/>
    </a>
  </section>
</xsl:template>

<!-- MAIN -->
<xsl:template match="main">
  <main id="main" class="blogs-main">
    <section id="blogDestacado" class="blogs-news-container">
      <xsl:apply-templates select="blogDestacado"/>
    </section>
    <section id="todosLosBlogs" class="blogs-post-container">
        <div class="grid-container">
            <h3>BLOGS</h3>
                <xsl:apply-templates select="todosLosBlogs/posts"/>
        </div>
    </section>
    <section id="contacto" class="contact-main-container">
      <xsl:apply-templates select="contacto"/>
    </section>
  </main>
</xsl:template>

<xsl:template match="blogDestacado">
  <div class="grid-container blogs-main-new">
    <h3>BLOG PRINCIPAL</h3>
    <div class="blogs-news-img-container">
      <img src="{imagen}"/>
    </div>
    <div class="blogs-news-info-container">
      <h2><xsl:value-of select="titulo"/></h2>
      <p><xsl:value-of select="descripcion"/></p>
      <a href="{url}" class="blogs-button">Leer más</a>
    </div>
  </div>
</xsl:template>

<xsl:template match="todosLosBlogs/posts">
    <article class="post-container">
      <img src="{imagen}" alt=""/>
      <h4 title="{titulo}"><xsl:value-of select="titulo"/></h4>
      <p><xsl:value-of select="descripcion"/></p>
      <a href="{url}" class="blogs-button">Leer más</a>
    </article>
</xsl:template>

<xsl:template match="contacto">
    <div>
      <img src="./assets/icons/correo (1).png" alt=""/>
      <div class="contact-left">
        <a href="mailto:{correo}"><xsl:value-of select="correo"/></a>
        <p>Correo</p>    
      </div>
    </div>
    <div>
      <img src="./assets/icons/favorito.png" alt=""/>
      <div class="contact-right">
        <a href="{paginaWeb}">Visitar</a>
        <p>Página de contacto</p>
      </div>
    </div>
</xsl:template>

<!-- FOOTER -->
<xsl:template match="footer">
  <footer id="footer">
    <a href="{url}"><img src="{imagen}"/></a>
    <p><xsl:value-of select="texto"/></p>
  </footer>
</xsl:template>

</xsl:stylesheet>

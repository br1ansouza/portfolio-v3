<script lang="ts">
  const links = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#projetos', label: 'Projetos' },
    { href: '#certificados', label: 'Certificados' },
    { href: '#contato', label: 'Contato' },
  ];
</script>

<nav class="nav">
  <a class="nav__brand" href="#hero">BS</a>
  <ul class="nav__links">
    {#each links as link (link.href)}
      <li><a href={link.href}>{link.label}</a></li>
    {/each}
  </ul>
</nav>

<style>
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) var(--space-4);
  }

  .nav__brand {
    font-family: var(--font-display);
    text-decoration: none;
    font-weight: 700;
  }

  .nav__links {
    display: flex;
    gap: var(--space-3);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav__links a {
    text-decoration: none;
  }
</style>

# GLOSSARY.md

Termos usados no projeto e nas specs.

---

| Termo | Definição |
|---|---|
| **Work** | Um case study ou projeto de design no portfolio. Cada work é um diretório em `content/works/` com um `index.mdx`. |
| **Slug** | Identificador único de um work, usado na URL (`/<slug>`). Corresponde ao nome da pasta em `content/works/`. Também chamado de `pathSlug` no código. |
| **Frontmatter** | Metadados YAML no início de cada `index.mdx`. Define título, slug, published, private, etc. |
| **Dev mode** | Modo de edição local (apenas em development). Permite reordenar works e editar o hero da home. |
| **Hero** | Seção de introdução no topo da home page com nome, descrição, cargo e empresa. Conteúdo em `content/home-content.json`. |
| **Private work** | Work protegido por senha. `private: true` no frontmatter ativa o middleware de autenticação. |
| **Draft work** | Work não publicado. `published: false` no frontmatter. Visível apenas em dev mode. |
| **CSS legado** | Arquivos SCSS em `/styles/`, migrados do Gatsby sem modificação. Imutáveis. |
| **CSS Module** | Arquivo `.module.scss` com escopo local. Usado para componentes novos que não existiam no Gatsby. |
| **Asset base path** | Prefixo `/works-asset/{slug}` usado para resolver caminhos relativos de imagens nos MDX. |
| **Edge runtime** | Ambiente de execução do middleware (Vercel Edge). Não suporta `fs`, por isso `PRIVATE_SLUGS` é um arquivo estático. |
| **Gallery** | Componente de galeria de imagens em linha. Pode ser normal, narrow (960px) ou slideshow (carrossel). |
| **Phosphor Icons** | Biblioteca de ícones (`@phosphor-icons/react`) usada em componentes MDX (Highlight, ResearchBlock). Não usada nos ícones de layout. |
| **SDD** | Spec-Driven Development — metodologia onde specs são escritas antes do código e mantidas em sincronia. Framework: Scofield. |
| **Spec sync** | Processo de atualizar as specs para refletir o que foi implementado (step 4 do workflow SDD). |
| **HomeContent** | Interface TypeScript e schema JSON para o conteúdo dinâmico do hero da home (name, description, role, company, companyUrl). |
| **WorkItem** | Interface TypeScript que estende `WorkFrontmatter` com `pathSlug`. Tipo principal usado na listagem de works. |

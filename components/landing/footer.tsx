const columns = [
  {
    title: 'Actions',
    links: ['Summarist Magazine', 'Cancel Subscription', 'Help', 'Contact us'],
  },
  {
    title: 'Useful Links',
    links: ['Pricing', 'Summarist Business', 'Gift Cards', 'Authors & Publishers'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Partners', 'Code of Conduct'],
  },
  {
    title: 'Other',
    links: ['Sitemap', 'Legal Notice', 'Terms of Service', 'Privacy Policies'],
  },
]

export function Footer() {
  return (
    <footer className="bg-secondary py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-bold">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li
                    key={link}
                    className="cursor-pointer text-sm text-foreground/70 transition-colors hover:text-brand-green"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm font-medium text-foreground/70">
          Copyright &copy; 2023 Summarist.
        </p>
      </div>
    </footer>
  )
}

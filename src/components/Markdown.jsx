const styles = `
max-w-none text-ink
[&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight
[&_h2]:scroll-mt-24 [&_h2]:mb-4 [&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight
[&_h3]:scroll-mt-24 [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight
[&_h4]:mb-2 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-semibold
[&_p]:mb-5 [&_p]:text-[17px] [&_p]:leading-8
[&_a]:underline [&_a]:decoration-accent/50 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:decoration-accent
[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-muted
[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:marker:text-muted
[&_li]:mb-1.5 [&_li]:leading-8
[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:text-muted
[&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]
[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-line [&_pre]:bg-surface [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-6
[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[inherit]
[&_hr]:my-10 [&_hr]:border-line
[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
[&_th]:border [&_th]:border-line [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium
[&_td]:border [&_td]:border-line [&_td]:px-4 [&_td]:py-2
[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg
`.replace(/\s+/g, ' ').trim()

export default function Markdown({ html }) {
  return (
    <div className="border-t border-line pt-8">
      <div className={styles} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

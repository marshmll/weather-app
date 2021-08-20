import NextHead from 'next/head'

export default function Head(props) {
  return (
    <NextHead>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
      <link rel="icon" href={props.iconHref} type="image/svg" />
      <title>{props.title}</title>
    </NextHead>
  )
}

import '@/styles/globals.css'
import AnimatedCursor from '@/components/AnimatedCursor'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatedCursor />
      <Component {...pageProps} />
    </>
  )
}

import { LogoGrid } from '@/components/LogoGrid'

export const metadata = {
  title: 'Press & Media | Antje Worring',
  description: 'Featured in British Vogue, People Magazine, Elle, The Washington Post, and more.',
}

export default function PressPage() {
  return (
    <main style={{ paddingTop: '12rem' }}>
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '1rem',
          textTransform: 'lowercase',
          color: 'var(--color-black)',
        }}
      >
        press
      </h1>
      <LogoGrid />
    </main>
  )
}

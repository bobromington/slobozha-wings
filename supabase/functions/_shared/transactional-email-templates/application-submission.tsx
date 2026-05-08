import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ApplicationSubmissionProps {
  mode?: 'civilian' | 'military'
  lang?: 'ua' | 'en'
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  day?: string
  month?: string
  year?: string
  branch?: string
  comment?: string
}

const labelFor = (mode?: string) =>
  mode === 'military' ? 'Військовий' : 'Цивільний'

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Section style={row}>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value && value.length ? value : '—'}</Text>
  </Section>
)

const ApplicationSubmissionEmail = ({
  mode, lang, firstName, lastName, phone, email,
  day, month, year, branch, comment,
}: ApplicationSubmissionProps) => {
  const fullName = [lastName, firstName].filter(Boolean).join(' ') || '—'
  const birth = [day, month, year].filter(Boolean).join('.') || '—'
  const phoneFormatted = phone ? `+38${phone}` : '—'

  return (
    <Html lang="uk" dir="ltr">
      <Head />
      <Preview>Нова анкета — {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Нова анкета</Heading>
          <Text style={subtitle}>Загін «Слобода» · форма на сайті</Text>
          <Hr style={hr} />
          <Row label="Ім'я та прізвище" value={fullName} />
          <Row label="Телефон" value={phoneFormatted} />
          <Row label="Email" value={email} />
          <Row label="Дата народження" value={birth} />
          <Row label="Статус" value={labelFor(mode)} />
          {mode === 'military' && <Row label="Рід військ" value={branch} />}
          <Row label="Коментар" value={comment} />
          <Hr style={hr} />
          <Text style={meta}>Мова форми: {lang === 'en' ? 'EN' : 'UA'}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ApplicationSubmissionEmail,
  subject: (d: Record<string, any>) => {
    const name = [d?.lastName, d?.firstName].filter(Boolean).join(' ') || 'без імені'
    return `Нова анкета — ${name}`
  },
  to: 'slobodangu@gmail.com',
  displayName: 'Application submission',
  previewData: {
    mode: 'military',
    lang: 'ua',
    firstName: 'Іван',
    lastName: 'Петренко',
    phone: '0501234567',
    email: 'ivan@example.com',
    day: '15', month: '06', year: '1990',
    branch: 'zsu',
    comment: 'Готовий приєднатись.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#000', margin: '0 0 4px' }
const subtitle = { fontSize: '13px', color: '#888', margin: '0 0 16px' }
const hr = { borderColor: '#eee', margin: '16px 0' }
const row = { margin: '0 0 12px' }
const rowLabel = { fontSize: '12px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '0 0 2px' }
const rowValue = { fontSize: '15px', color: '#111', margin: '0' }
const meta = { fontSize: '12px', color: '#888', margin: '0' }

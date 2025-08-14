import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button, Container, Hr } from "@react-email/components";


interface VerificationEmailProps {
    name: string;
    verificationLink: string;
}


export default function VerificationEmailTemplate({ name, verificationLink }: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Welcome to Clash - Verify Your Account</title>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
                        format: 'woff2'
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>

            <Preview>Welcome to Clash! Verify your account to get started.</Preview>

            <Container style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                fontFamily: 'Inter, Arial, sans-serif'
            }}>
                <Section style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '40px 32px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                }}>
                    <Row>
                        <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <Heading style={{
                                fontSize: '48px',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                margin: '0 0 8px 0',
                                letterSpacing: '-0.02em'
                            }}>
                                Clash
                            </Heading>
                        </Section>
                    </Row>

                    <Hr style={{
                        border: 'none',
                        borderTop: '1px solid #e5e7eb',
                        margin: '32px 0'
                    }} />

                    <Row>
                        <Heading as="h2" style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#111827',
                            margin: '0 0 16px 0',
                            lineHeight: '1.3'
                        }}>
                            Hey {name}! 👋
                        </Heading>
                    </Row>

                    <Row>
                        <Text style={{
                            fontSize: '16px',
                            color: '#4b5563',
                            lineHeight: '1.6',
                            margin: '0 0 24px 0'
                        }}>
                            Thanks for joining Clash! We're excited to have you on board. To get started and access all features, please verify your email address by clicking the button below.
                        </Text>
                    </Row>

                    <Row>
                        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                            <Button
                                href={verificationLink}
                                style={{
                                    backgroundColor: '#a855f7',
                                    background: 'linear-gradient(135deg, #f472b6 0%, #a855f7 100%)',
                                    color: '#ffffff',
                                    padding: '14px 32px',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    border: 'none',
                                    boxShadow: '0 4px 14px 0 rgba(168, 85, 247, 0.3)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Verify My Account
                            </Button>
                        </Section>
                    </Row>

                    <Row>
                        <Text style={{
                            fontSize: '14px',
                            color: '#a855f7',
                            lineHeight: '1.5',
                            margin: '0 0 32px 0',
                            textAlign: 'center',
                            wordBreak: 'break-all',
                            backgroundColor: '#f9fafb',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb'
                        }}>
                            {verificationLink}
                        </Text>
                    </Row>

                    <Hr style={{
                        border: 'none',
                        borderTop: '1px solid #e5e7eb',
                        margin: '32px 0'
                    }} />

                    <Row>
                        <Text style={{
                            fontSize: '14px',
                            color: '#9ca3af',
                            lineHeight: '1.5',
                            margin: '0 0 8px 0'
                        }}>
                            If you didn't create a Clash account, you can safely ignore this email.
                        </Text>
                    </Row>

                    <Row>
                        <Text style={{
                            fontSize: '14px',
                            color: '#9ca3af',
                            lineHeight: '1.5',
                            margin: '0'
                        }}>
                            This verification link will expire in 2 hours for security reasons.
                        </Text>
                    </Row>
                </Section>

                <Section style={{
                    textAlign: 'center',
                    padding: '24px 0 0 0'
                }}>
                    <Text style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        margin: '0',
                        lineHeight: '1.4'
                    }}>
                        © 2025 Clash. All rights reserved.
                    </Text>
                </Section>
            </Container>
        </Html>
    );
}
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Container, Hr } from "@react-email/components";


interface VerificationEmailProps {
    name: string;
    verifyCode?: string;
}


export default function VerificationEmailTemplate({ name, verifyCode }: VerificationEmailProps) {
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

            <Preview>Welcome to Clash! Use code to verify your account.</Preview>

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
                            Thanks for joining Clash! We're excited to have you on board. To get started and access all features, please enter the verification code below in your app.
                        </Text>
                    </Row>

                    <Row>
                        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
                            <Text style={{
                                fontSize: '14px',
                                color: '#6b7280',
                                margin: '0 0 12px 0',
                                fontWeight: '600'
                            }}>
                                Your Verification Code:
                            </Text>
                            <Text style={{
                                fontSize: '32px',
                                fontWeight: '800',
                                color: '#a855f7',
                                letterSpacing: '8px',
                                margin: '0',
                                padding: '20px 32px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '12px',
                                border: '2px solid #e5e7eb',
                                display: 'inline-block',
                                fontFamily: 'Monaco, Consolas, monospace'
                            }}>
                                {verifyCode}
                            </Text>
                        </Section>
                    </Row>

                    <Row>
                        <Text style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: '1.5',
                            margin: '0 0 16px 0',
                            textAlign: 'center'
                        }}>
                            Simply copy this code and paste it in the verification field.
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
                            This verification code will expire in 10 minutes for security reasons.
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
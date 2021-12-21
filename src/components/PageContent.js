import React from 'react';
import { Page, Card, Banner, Layout, FormLayout, TextField } from '@shopify/polaris';
import { ViewMajor } from '@shopify/polaris-icons';
import UploadAndCrop from './UploadAndCrop';

export default function PageContent() {

    const banner = <Banner
    title="Congratulations! You’re now ready to build your expert profile!"
    status="info"
    onDismiss={() => {alert('Clicked')}}
  >
    <p>Take the time to ensure your profile is as captivating as you are. Elaborate on your services, what makes your skillset unique and what you bring to the table. Choose powerful images and ensure that your profile stands out above the rest! </p>
  </Banner>

    return (
        <Page
            title="My Expert Profile"
            secondaryActions={[
                {
                content: 'View',
                external: true,
                icon: ViewMajor,
                },
            ]}
            >
    {banner}

    <Layout>
        <Layout.AnnotatedSection
            id="storeDetails"
            title="About Me and My Services "
            description="This is where you’ll provide essential details about both you and the services you provide.Make sure to include captivating details about yourself and your experience and what makes your skill set unique. Highlight what makes you stand out as a professional and what clients can expect from your offerings. "
        >
            <div style={{marginTop: '1em'}}>
                <Card sectioned>
                <FormLayout>
                    <TextField label="Store name" onChange={() => {}} autoComplete="off" />
                    <TextField
                    type="email"
                    label="Account email"
                    onChange={() => {}}
                    autoComplete="email"
                    />
                </FormLayout>
                </Card>
            </div>
        </Layout.AnnotatedSection>
    </Layout>

    <Layout>
        <Layout.AnnotatedSection
            id="storeDetails"
            title="Store details"
            description="Shopify and your customers will use this information to contact you."
        >
            <div style={{marginTop: '1em'}}>
                <Card sectioned title='Profile Picture'>  
                     <UploadAndCrop/>
                </Card>
            </div>
        </Layout.AnnotatedSection>
    </Layout>


</Page>
    )
}

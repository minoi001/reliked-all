import Script from "next/script";

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-WVNYK69X5D`}
      />
      <Script
        id={"google-analytics"}
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${process.env.GOOGLE_ANALYTICS_TRACKING_ID}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
};

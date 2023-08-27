import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const GoogleAnalytics = () => {
  const pageView = (url) => {
    window.gtag("config", process.env.GOOGLE_ANALYTICS_TRACKING_ID, {
      page_path: url,
    });
  };
  const pathName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const uri = pathName + searchParams;
    pageView(uri);
  }, [pathName, searchParams, process.env.GOOGLE_ANALYTICS_TRACKING_ID]);

  return (
    <>
      <Script
        async
        //TODO- Replace with G-W6EE5XQGE6
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
                    'debug_mode': true
                });
                `,
        }}
      />
    </>
  );
};

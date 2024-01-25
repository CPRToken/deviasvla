import type { NextPage } from 'next';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import Typography from '@mui/material/Typography';
import {HomeCaps} from 'src/sections/home/home-caps';
import { HomeCta } from 'src/sections/home/home-cta';
import { HomeHero } from 'src/sections/home/home-hero';
import {HomeFaqs} from "../sections/home/home-faqs";


const Page: NextPage = () => {
    usePageView();

  return (
    <>


      <Seo />
      <main>
        <HomeHero />






      </main>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;

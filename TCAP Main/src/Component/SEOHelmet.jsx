// import { Helmet } from "react-helmet";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const BASE_URL = "https://tcapitalwealth.com";

// function SEOHelmet({ page }) {

//   const [seo, setSeo] = useState(null);

//   useEffect(() => {

//     axios.post(
//       `${BASE_URL}/tcap/index.php/Welcome/get_seo_by_page`,
//       {
//         page_name: page
//       }
//     )
//     .then(res => {

//       if (res.data.status === "true") {
//         setSeo(res.data.data);
//       }

//     })
//     .catch(err => {
//       console.log("SEO API error", err);
//     });

//   }, [page]);

//   if (!seo) return null;

//   return (
//     <Helmet>

//       <title>{seo.meta_title}</title>

//       <meta
//         name="description"
//         content={seo.meta_description}
//       />

//       <meta
//         name="keywords"
//         content={seo.meta_keywords}
//       />

//       <link
//         rel="canonical"
//         href={seo.canonical_url}
//       />

//     </Helmet>
//   );
// }

// export default SEOHelmet;


import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://tcapitalwealth.com";

function SEOHelmet({ page }) {

  const [seo, setSeo] = useState(null);

  useEffect(() => {

    axios.post(
      `${BASE_URL}/tcap/index.php/Welcome/get_seo_by_page`,
      {
        page_name: page
      }
    )
    .then(res => {

      if (res.data.status === "true") {
        setSeo(res.data.data);
      }

    })
    .catch(err => {
      console.log("SEO error", err);
    });

  }, [page]);

  if (!seo) return null;

  return (
    <Helmet>

      <title>{seo.meta_title}</title>

      <meta
        name="description"
        content={seo.meta_description}
      />

      <meta
        name="keywords"
        content={seo.meta_keywords}
      />

      <link
        rel="canonical"
        href={seo.canonical_url}
      />

    </Helmet>
  );
}

export default SEOHelmet;
import Head from "next/head";
import React from "react";

import styles from "./styles.module.scss";

const Posts: React.FC = () => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>
              Um conjunto de filosofias extremamente importantes e populares no
              ecossistema
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>
              Um conjunto de filosofias extremamente importantes e populares no
              ecossistema
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Código Limpo: reflexão e prática</strong>
            <p>
              Um conjunto de filosofias extremamente importantes e populares no
              ecossistema
            </p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Posts;

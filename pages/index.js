import Header from "../components/home/header";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";

export default function Home() {
  return (
    <Layout home>
      <Header />
      <div className={styles.howTo}>
        <p className={styles.subTitle}>QUICK AND SIMPLE SERVICE</p>
        <h2 className={styles.title}>How to Book Bus Ticket</h2>
        <p className={styles.caption}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          consequuntur deserunt maiores, aliquid saepe non pariatur, architecto,
          deleniti ab labore quisquam neque quod cumque necessitatibus
          reiciendis at cum ducimus similique.
        </p>
        <div className={styles.howToGrid}>
          <div className={styles.howToGridTtem}>
            <Image
              src="/images/search_svg.svg"
              alt="serch"
              width={150}
              height={168}
            />
            <p className={styles.howToCaption}>Find a trip</p>
          </div>
          <div className={styles.howToGridTtem}>
            <Image
              src="/images/selected_svg.svg"
              alt="serch"
              width={150}
              height={168}
            />
            <p className={styles.howToCaption}>Select and Book The Seat</p>
          </div>
          <div className={styles.howToGridTtem}>
            <Image
              src="/images/travel_svg.svg"
              alt="serch"
              width={150}
              height={168}
            />
            <p className={styles.howToCaption}>Travel and Show Your Ticket</p>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.subTitle}>CONVENIENCE SERVICE</p>
        <h2 className={styles.title}>What makes BookYourSeat special?</h2>
        <p className={styles.caption}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          consequuntur deserunt maiores, aliquid saepe non pariatur, architecto,
          deleniti ab labore quisquam neque quod cumque necessitatibus
          reiciendis at cum ducimus similique.
        </p>
        <div className={styles.whatSpecialContainer}>
          {/* Special Section 1 */}
          <div className={styles.imgLeft}>
            <Image
              src="/images/confirmed_svg.svg"
              alt="serch"
              width={210}
              height={250}
            />
          </div>
          <div>
            <h2 className={styles.whatSpecialTitle}>
              Simple and easy to use online booking
            </h2>
            <p className={styles.whatSpecialCaption}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos consequuntur deserunt maiores, aliquid saepe non
              pariatur, architecto, deleniti ab labore quisquam neque quod
              cumque necessitatibus reiciendis at cum ducimus similique.
            </p>
          </div>
          {/* Special Section 2 */}
          <div>
            <h2 className={styles.whatSpecialTitle}>No additional cost</h2>
            <p className={styles.whatSpecialCaption}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos consequuntur deserunt maiores, aliquid saepe non
              pariatur, architecto, deleniti ab labore quisquam neque quod
              cumque necessitatibus reiciendis at cum ducimus similique.
            </p>
          </div>
          <div className={styles.imgRight}>
            <Image
              src="/images/discount_svg.svg"
              alt="serch"
              width={300}
              height={200}
            />
          </div>
          {/* Special Section 3 */}
          <div className={styles.imgLeft}>
            <Image
              src="/images/cc_svg.svg"
              alt="serch"
              width={200}
              height={200}
            />
          </div>
          <div>
            <h2 className={styles.whatSpecialTitle}>
              Convenience and safe online
              <br /> payment
            </h2>
            <p className={styles.whatSpecialCaption}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos consequuntur deserunt maiores, aliquid saepe non
              pariatur, architecto, deleniti ab labore quisquam neque quod
              cumque necessitatibus reiciendis at cum ducimus similique.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

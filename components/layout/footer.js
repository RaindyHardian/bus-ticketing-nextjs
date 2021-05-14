import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <h4 className={styles.title}>BookYourSeat</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In optio,
          minima tempora impedit, quasi corporis doloremque mollitia blanditiis
          exercitationem ex quos ipsa quod ratione.
        </p>
      </div>
      <div>
        <h4 className={styles.title}>Company</h4>
        <ul className={styles.footerList}>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>About Us</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>Service</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>Blog</a>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={styles.title}>Support</h4>
        <ul className={styles.footerList}>
        <li>
            <Link href="#">
              <a className={styles.footerLink}>Help Center</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>Privacy & Policy</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>Trust & Safety</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>Terms and Condition</a>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={styles.title}>Contact Us</h4>
        <ul className={styles.footerList}>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>bookyourseat@email.com</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className={styles.footerLink}>024 7XXXXXXX</a>
            </Link>
          </li>
          <li>
            Jalan Kamurocho Hills No. 1 RT 02/RW 03, Kec. Semarang Tengah, Kota
            Semarang, Jawa Tengah 5XXXX
          </li>
        </ul>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import styles from "./sidebar.module.css";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div
        className={isSidebarOpen ? styles.openOverlay : styles.closeOverlay}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className={styles.buttonContainer}>
        <FaBars
          className={styles.openButton}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <div className={isSidebarOpen ? styles.openSide : styles.closeSide}>
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId={router.pathname}
          onSelect={({ itemId }) => {
            // maybe push to the route
            if (
              itemId !== "busGroup" &&
              itemId !== "tripGroup" &&
              itemId !== "userGroup"
            ) {
              router.push(itemId);
            }
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/dashboard/admin",
              // you can use your own custom Icon component as well
              // icon is optional
              // elemBefore: () => <Icon name="inbox" />,
            },
            {
              title: "Bus",
              itemId: "busGroup",
              // elemBefore: () => <Icon name="users" />,
              subNav: [
                {
                  title: "List Bus",
                  itemId: "/dashboard/admin/bus",
                },
                {
                  title: "Create Bus",
                  itemId: "/dashboard/admin/bus/create",
                },
              ],
            },
            {
              title: "Trip",
              itemId: "tripGroup",
              subNav: [
                {
                  title: "List Trip",
                  itemId: "/dashboard/admin/trip",
                },
                {
                  title: "Create Trip",
                  itemId: "/dashboard/admin/trip/create",
                },
              ],
            },
            {
              title: "User",
              itemId: "userGroup",
              subNav: [
                {
                  title: "List User",
                  itemId: "/dashboard/admin/user",
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
}

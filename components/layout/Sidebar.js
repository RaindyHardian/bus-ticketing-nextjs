import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { FaBars } from "react-icons/fa";
import RoundedImage from "../ui/RoundedImage";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && session === null) {
    return router.replace("/");
  } else if (!loading && session) {
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
          <div className={styles.profile}>
            <RoundedImage alt={session.user.name} width="70" height="70" />
            <p>{session.user.name}</p>
          </div>
          <Navigation
            activeItemId={router.pathname}
            onSelect={({ itemId }) => {
              if (itemId === "userLogout") {
                return signOut();
              }

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
              {
                title: "Logout",
                itemId: "userLogout",
              },
            ]}
          />
        </div>
      </>
    );
  } else {
    return <div>Please Wait</div>;
  }
}

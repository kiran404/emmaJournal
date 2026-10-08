import { SITE_NAME } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        © {new Date().getFullYear()} {SITE_NAME}
      </div>
    </footer>
  );
}

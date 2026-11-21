import { permanentRedirect } from "next/navigation";

export default function CategoryRedirectPage() {
  permanentRedirect("/categories");
}

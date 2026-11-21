import { permanentRedirect } from "next/navigation";

export default function ResultRedirectPage() {
  permanentRedirect("/find-workers");
}

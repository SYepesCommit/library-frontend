
import { BookAdminComponent } from "@/src/components/books/BookAdminComponent";
import MainLayout from "@/src/components/layout/MainLayout";

export default function BooksPage() {
  return (
    <MainLayout>
      <BookAdminComponent />
    </MainLayout>
  );
}
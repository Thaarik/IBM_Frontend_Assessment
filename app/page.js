import PRList from "@/components/PRList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-20 mobile:p-16">
      <h1 className="mb-5 text-3xl font-bold text-center dark:text-[#F0F3F6]">Welcome to GitHub Pull Request page!!</h1>
      <h3 className="m-5 text-lg text-center dark:text-[#F0F3F6]">
        Enter the GitHub Repository link and it fetches all pull requests as per
        your order
      </h3>
      <PRList />
    </main>
  );
}

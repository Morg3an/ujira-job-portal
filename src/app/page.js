import { fetchProfileAction } from "@/actions";
import HomepageButtonControls from "@/components/homepage-button-controls";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import Image from "next/image"; // Import Image component from next/image

async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <Fragment>
      <section className="relative w-full h-full min-h-screen pb-10">
        <div className="w-full h-full relative">
          <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16">
            <section className="w-full lg:w-[50%] flex flex-col md:px-2 lg:px-0 p-5 lg:p-10">
              <div className="w-full flex justify-start flex-col h-auto lg:pt-7">
                <span className="flex space-x-2">
                  <span className="block w-14 mb-2 dark:border-white border-b-2 border-gray-700"></span>
                  <span className="font-medium dark:text-white text-gray-600">
                    One Stop Solution to Find Jobs
                  </span>
                </span>
                <h1 className="text-3xl dark:text-white mt-5 lg:text-7xl text-black font-extrabold">
                  The Best Job Portal For Licensed Nutritionists.
                </h1>
                <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
                  <HomepageButtonControls
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
              </div>
            </section>
            <section className="relative w-full lg:w-[50%] flex items-center justify-end">
              {/* Replaced <img> with <Image> for optimization */}
              <Image
                src="https://img.freepik.com/free-photo/man-handshaking-his-employer-after-being-accepted-his-new-office-job_23-2149034566.jpg?t=st=1731860428~exp=1731864028~hmac=65c4e7a5ae14e94258b9081c0e813e85a5bf792820ce308b79b4c671b32ab65c&w=826"
                alt="Hero"
                layout="fill" // Ensures image covers the space properly
                objectFit="cover" // Makes sure the image fits within its container
                className="z-10 border-none"
              />
            </section>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Home;

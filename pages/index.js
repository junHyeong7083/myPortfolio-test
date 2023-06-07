import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import NFTCard from "../components/NFTCard";
// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  // NFTCard에서 사용할 NFT ID 상태 관리
  const [nftId, setNftId] = useState(""); // 초기값은 비어있는 문자열로 설정
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // NFT ID 변경 이벤트 핸들러
  const handleNftIdChange = (event) => {
    setNftId(event.target.value);
  };

  const handleNftIdSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // NFT ID를 제출하고 NFT 데이터를 가져오는 로직
      const response = await axios.get(
        `https://api.opensea.io/api/v1/asset/${nftId}`
      );
      const nftData = response.data;

      // NFT 데이터를 가져왔을 때의 처리
      console.log("NFT Data:", nftData);
      // 여기에서 필요한 작업을 수행할 수 있습니다.

    } catch (error) {
      // NFT 데이터를 가져오지 못했을 때의 처리
      setErrorMessage("잘못된 NFT ID");
    }

    setIsLoading(false);
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="mt-10 laptop:mt-20">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="w-4/5 p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 text-bold mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="w-full p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 text-bold laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="w-full p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 text-bold laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="w-full p-1 text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl tablet:p-2 text-bold laptop:w-4/5"
            >
              {data.headerTag}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        <div className="p-2 mt-10 laptop:mt-30 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">MyGame</h1>

          {/* 별도의 NFT 입력 폼 */}
          <div className="mt-4">
            <input
              type="text"
              value={nftId}
              onChange={handleNftIdChange}
              placeholder="Enter NFT ID"
              className="p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleNftIdSubmit}
              className="p-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              Submit
            </button>
          </div>

          {isLoading && <div>Loading...</div>}
          {errorMessage && <div>{errorMessage}</div>}

          <div className="grid grid-cols-1 gap-4 mt-5 laptop:mt-10 tablet:grid-cols-2">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              >
                {/* NFTCard 컴포넌트 */}
                <NFTCard nftId={nftId} metaMaskAddress="0xC30b472b15CBAfBE4407f646A637E2fBD79355a8" />
              </WorkCard>
            ))}
          </div>
        </div>

        <div className="p-2 mt-10 laptop:mt-30 laptop:p-0">
          <h1 className="text-2xl tablet:m-10 text-bold">Services.</h1>
          <div className="grid grid-cols-1 gap-6 mt-5 tablet:m-10 laptop:grid-cols-2">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="p-2 mt-10 laptop:mt-40 laptop:p-0" ref={aboutRef}>
          <h1 className="text-2xl tablet:m-10 text-bold">About.</h1>
          <p className="w-full mt-2 text-xl tablet:m-10 laptop:text-3xl laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

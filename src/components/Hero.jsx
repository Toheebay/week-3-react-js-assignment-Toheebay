import Heading from "./Heading";
import Button from "./Button";
import LinkButton from "./LinkButton";

const Hero = ({ title, description, linkText, linkUrl, buttonText }) => {
  return (
    <div className="min-h-screen min-w-[320px] flex items-center justify-center bg-neutral-900 text-white font-sans">
      <main className="text-center p-4">
        <Heading title={title} />
        <p className="mb-4 text-lg">{description}</p>
        <LinkButton href={linkUrl} label={linkText} />
        <div className="mt-6">
          <Button text={buttonText} onClick={() => alert("Button clicked!")} />
        </div>
      </main>
    </div>
  );
};

export default Hero;

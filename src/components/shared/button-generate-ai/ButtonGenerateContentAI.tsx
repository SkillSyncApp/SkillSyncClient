import MagicIcon from "../../../icons/MagicIcon";
import { generatePost } from "../../../services/openAIService";
import toast from "react-hot-toast";

type ButtonGenerateContentAIProps = {
  title: string;
  setContent: (content: string) => void;
};

function ButtonGenerateContentAI({
  title,
  setContent,
}: ButtonGenerateContentAIProps) {
  const generatePostContent = async () => {
    try {
      if (title == "") {
        toast.error("Please fill title in order to generate content to post");
      }
      const postContent = await generatePost(title);
      setContent(postContent);
    } catch (err) {
      toast.error("Failed to generate post content");
    }
  };

  return (
    <button
      className="relative rounded-md text-gray-500 hover:text-white focus:outline-none flex items-center gap-1 py-1"
      onClick={generatePostContent}
    >
      <MagicIcon width={18} />
      <span className="text-sm">Generate Content with AI</span>
    </button>
  );
}

export default ButtonGenerateContentAI;

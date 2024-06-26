import { Modal } from "../Modal";
import { CancleIcon } from "assets";
import { Card } from "components/Atoms/Card/Card";

interface HowToPlayModal {
    onClose: () => void;
}

export const HowToPlayModal = ({ onClose }: HowToPlayModal) => {

  return (
    <Modal blurImg={true} style={{ zIndex: 50 }}>
    <Card pseudoElement="secondary" className="!px-5">
      <button
        onClick={() => onClose()}
        className="cursor-pointer absolute top-2 right-2"
      >
        <CancleIcon />
      </button>

    <div className="max-h-[56vh] mt-2 flex flex-col gap-3 !cursor-default">
      {/* <h3 className="text-text-primary">QUEST OVERVIEW</h3> */}
      <p className="text-text-primary">Welcome to Black Pass Season 1! We’re excited to have you here.</p>
      <p className="text-text-light"><span className="text-text-primary">1.</span> The Black Pass is a SocialFI platform accessible through a free soulbound NFT, mintable at the time of joining. On this platform, you'll undertake social quests and farm shards (points) to earn the $RVV token airdrop, the official token of the Astra Nova ecosystem. It all begins with Season 1, centered around Astra Nova's upcoming game demo.</p>

      <h2 className="text-text-primary"><span className="min-w-max ">&#8226;</span>{" "}RULES, SHARDS, AND DEMO GAME PLAYTEST</h2>
      <p className="text-text-light"><span className="text-text-primary">2.</span> In Season 1, earning shards is simple — just do what you do daily on X and talk about Astra Nova organically. Once you reach a certain number of shards, your level will increase. Create original content / memes including any of the following:</p>
      <ul>
        <li className="text-text-light"><span>-</span> tag @Astra__Nova</li>
        <li className="text-text-light"><span>-</span>include the keyword Astranova</li>
        <li className="text-text-light"><span>-</span>Use the cashtag $RVV to mention the token tag</li>
        <li className="text-text-light"><span>-</span>Use the hashtag #Astranova</li>
      </ul>
      <p className="text-text-light">Interacting with tweets using those keywords or the official account will also earn you shards.</p>
      <p className="text-text-light"><span className="text-text-primary">3.</span> Any post or tweet that is liked by @Astra__Nova will earn you a big bonus in shards and be included in the reward pool. Bring your best content and memes!</p>
      <p className="text-text-light"><span className="text-text-primary">4.</span> After Season 1, all your progress will be reset. Shards you earned from Season 1 will translate into rewards ($RVV).YAY!</p>
      <p className="text-text-light"><span className="text-text-primary">5.</span> Content quality is weighted much more than quantity. Be creative and original.</p>
      <p className="text-text-light"><span></span> </p>
      <h2 className="text-text-primary"><span className="min-w-max ">&#8226;</span>{" "}RESTRICTIONS</h2>
      <p className="text-text-light"><span className="text-text-primary">6.</span> Botting and spamming are prohibited and will result in shard deductions or bans.</p>
    </div>
    </Card>
  </Modal>
  );
};
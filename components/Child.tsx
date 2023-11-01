import { useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from "@/app/_config/blockchain";
import { ABI } from "@/app/_config/abi";
import { useState } from "react";

const zeroAddress = "0x0000000000000000000000000000000000000000"

export default function Child() {
  const [walletAddress, setWalletAddress] = useState<string>(zeroAddress)
  const { contract } = useContract(contractAddress, ABI);

  const validAddress = (address: string): string => {
    // 42文字の16進文字列で、'0x'で始まる場合のみアドレスとして認識
    const pattern = /^0x[a-fA-F0-9]{40}$/;
    if (pattern.test(address)) {
      return address;
    } else {
      return zeroAddress;
    }
  };

  // コントラクトからのRead
  const { data: allowList = 0 } = useContractRead(contract, "allowList", [validAddress(walletAddress)]);

  return (
    <>
      <div className="relative isolate overflow-hidden pt-14 bg-gray-800 min-h-screen px-5">
        <div className="mx-auto max-w-2xl py-20 flex flex-col items-center">

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            The ANARCHY
          </h1>

          <div className="mt-6 p-6 text-base leading-8 text-black bg-white shadow-lg rounded-lg">
            <p className="text-gray-700">
              ALが正しく反映されているか確認してください。<br/>
              登録したものと異なる場合は、Discordの「#お問い合わせ」からご連絡ください。
            </p>
            <p className="mt-4 text-sm text-gray-600 font-bold">
              ※運営のミスの場合のみ変更可能です。<br/>
              （個人都合での変更は、変更のガス代が必要となります）
            </p>
          </div>

          <div className="w-full mt-8 flex justify-center gap-3">
            <input
              type="text"
              placeholder="0x....abcd"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block max-w-md w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm text-gray-900
               placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(event) => setWalletAddress(event.target.value)}
            />

          </div>

          <p className="text-white mt-3 text-lg font-bold">
            あなたのALは {allowList.toString()} 枚です
          </p>

        </div>
      </div>
    </>
  )
}
"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Session } from "next-auth";

type SearchPromptType = "해커톤 담당자 검색" | "모바일 로봇 S/W 설계" | "해상풍력 강재와 구조 설계";

const PROMPT_EXAMPLES: Record<SearchPromptType, string> = {
	"해커톤 담당자 검색":
		"포스코그룹 WX 해커톤 대회에서 임직원 검색 솔루션(키맨)을 개발한 담당자를 찾아줘",
	"모바일 로봇 S/W 설계":
		"포스코DX에서 컴퓨터공학 전공과 관련된 석사, 박사 중 모바일 로봇 소프트웨어(S/W) 설계 경험이 있는 사람 찾아줘",
	"해상풍력 강재와 구조 설계":
		"해상풍력용 강재를 담당하는 포스코 연구원과 해상풍력 구조 설계를 담당하는 포스코이앤씨 리더를 검색해줘",
};

const PROMPT_BUTTONS: { label: SearchPromptType; icon: string }[] = [
	{ label: "해커톤 담당자 검색", icon: "🔍" },
	{ label: "모바일 로봇 S/W 설계", icon: "🤖" },
	{ label: "해상풍력 강재와 구조 설계", icon: "🌊" },
];

interface SearchInputProps {
	onSubmit: (formData: FormData) => Promise<void>;
	session: Session | null;
}

export default function SearchInput({ onSubmit, session }: SearchInputProps) {
	const [query, setQuery] = useState("");

	return (
		<div className="w-full max-w-xl">
			<form action={onSubmit} className="w-full">
				<div className="rounded-2xl p-3 bg-gradient-to-r from-[#E4E5F9] via-[#A980F6] to-[#CB97FC]">
					<div className="relative w-full">
						<textarea
							name="query"
							rows={2}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={
								session
									? "어떤 인재를 찾고 있나요? 찾고 싶은 인재에 대해 말씀해주세요."
									: "인재를 찾으려면 로그인이 필요합니다"
							}
							className="w-full text-[13px] bg-transparent
                  text-black placeholder-gray-700 resize-none
                  border-none focus:outline-none min-h-[48px] max-h-[120px]
                  scrollbar-thin scrollbar-thumb-[#2c3244] scrollbar-track-transparent
                  hover:scrollbar-thumb-[#374151] disabled:opacity-50 disabled:cursor-not-allowed"
							style={{
								scrollbarWidth: "thin",
								scrollbarColor: "#2c3244 transparent",
								height: "auto",
								overflow: "hidden",
							}}
						/>
					</div>
					<div className="flex justify-end mt-2">
						<button
							type="submit"
							disabled={!session || !query.trim()}
							className="p-1.5 bg-[#2c3244] hover:bg-[#374151] text-white
                rounded-full transition-all duration-200
                active:scale-95 flex items-center justify-center
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2c3244]"
							aria-label="검색"
						>
							<ArrowUp size={16} />
						</button>
					</div>
				</div>
			</form>
			<div className="flex flex-wrap justify-center gap-1.5 mt-5 max-w-xl">
				{PROMPT_BUTTONS.map(({ label, icon }) => (
					<button
						key={label}
						type="button"
						disabled={!session}
						onClick={() => setQuery(PROMPT_EXAMPLES[label])}
						className={`px-3 py-2 rounded-lg bg-[#1c1f2a] text-xs text-gray-300 
              transition-all duration-200 flex items-center gap-1.5
              ${session ? "hover:bg-[#2c3244] hover:text-white" : "opacity-50 cursor-not-allowed"}`}
					>
						<span>{icon}</span>
						{label}
					</button>
				))}
			</div>
		</div>
	);
}

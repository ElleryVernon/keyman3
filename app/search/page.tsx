import SearchResultsClient from "@/components/search-result";

interface SearchPageProps {
	searchParams: {
		query?: string;
		view?: "card" | "list";
	};
}

export default function Page({ searchParams }: SearchPageProps) {
	const query = searchParams.query || "";
	const selectedView = searchParams.view || "card";

	return (
		<div className="min-h-screen bg-[#121318] text-white">
			<nav className="sticky top-0 z-10 bg-[#121318]/90 border-b border-[#1E2028] px-3 py-2">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<a href="/" className="flex items-center text-[#9095A0] hover:text-white">
						{/* 뒤로가기 아이콘 및 메인으로 텍스트 */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-4 h-4 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
						<span className="text-xs">메인으로</span>
					</a>
					<div className="flex items-center space-x-2">
						<div className="flex bg-[#1E2028] rounded-lg p-0.5">
							<a
								href={`/search?view=card&query=${query}`}
								className={`px-2 py-1 rounded-md text-xs ${
									selectedView === "card" ? "bg-[#282B36]" : ""
								}`}
							>
								카드뷰
							</a>
							<a
								href={`/search?view=list&query=${query}`}
								className={`px-2 py-1 rounded-md text-xs ${
									selectedView === "list" ? "bg-[#282B36]" : ""
								}`}
							>
								리스트뷰
							</a>
						</div>
					</div>
				</div>
			</nav>

			<main className="max-w-4xl mx-auto px-3 py-3">
				<form className="mb-4">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-2 flex items-center">
							{/* 검색 아이콘 */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-3.5 h-3.5 text-[#9095A0]"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<circle cx="11" cy="11" r="8" />
								<path d="M21 21l-4.35-4.35" />
							</svg>
						</div>
						<input
							type="text"
							name="query"
							defaultValue={query}
							placeholder="필요한 인재의 조건을 입력해 주세요"
							className="w-full pl-7 pr-2 py-1.5 bg-[#1E2028] border border-[#282B36] rounded-lg
            text-xs placeholder-[#9095A0] focus:outline-none focus:border-[#363945]"
						/>
					</div>
				</form>

				<SearchResultsClient query={query} selectedView={selectedView} />
			</main>
		</div>
	);
}

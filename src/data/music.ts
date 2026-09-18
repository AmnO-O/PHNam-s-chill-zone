import { MusicTrack } from "@/types";
export type { MusicTrack } from "@/types";

export const rawMusicUrls: string[] = [
  "https://www.youtube.com/watch?v=fgpwTxIv76Q",
  "https://www.youtube.com/watch?v=iR964FRowgA",
  "https://www.youtube.com/watch?v=oEwgOQMM5PI",
  "https://www.youtube.com/watch?v=XkTs-AzGXnc",
  "https://www.youtube.com/watch?v=NWvYZT-HU54",
  "https://www.youtube.com/watch?v=ZXhXlffz_60",
  "https://www.youtube.com/watch?v=uWPy5-4jBSE",
  "https://www.youtube.com/watch?v=iwVdYvi66Fc",
  "https://www.youtube.com/watch?v=_hS33cHtK-E",
  "https://www.youtube.com/watch?v=HC6xx-GxlUY",
  "https://www.youtube.com/watch?v=cGJJX3L7I7I",
  "https://www.youtube.com/watch?v=r1Fx0tqK5Z4",
  "https://www.youtube.com/watch?v=9Ke4480MicU",
  "https://www.youtube.com/watch?v=DzwkcbTQ7ZE",
  "https://www.youtube.com/watch?v=N6SQ9QoSjCI",
  "https://www.youtube.com/watch?v=-CmadmM5cOk",
  "https://www.youtube.com/watch?v=PuZQXbcuqnQ",
  "https://www.youtube.com/watch?v=n7eq3E9zE2Y",
  "https://www.youtube.com/watch?v=ZAfAud_M_mg",
  "https://www.youtube.com/watch?v=TdrL3QxjyVw",
  "https://www.youtube.com/watch?v=50VNCymT-Cs",
  "https://www.youtube.com/watch?v=H8NTALzm0F4",
  "https://www.youtube.com/watch?v=7RWbq-lbBlk",
  "https://www.youtube.com/watch?v=FvOpPeKSf_4",
  "https://www.youtube.com/watch?v=K5NEOwRXa_8",
  "https://www.youtube.com/watch?v=aDCcW_sVp9M",
  "https://www.youtube.com/watch?v=mzmjdntlRJk",
  "https://www.youtube.com/watch?v=lV0OOyDUPII",
  "https://www.youtube.com/watch?v=j3KCob5TbMk",
  "https://www.youtube.com/watch?v=W4UeUJA9wLU",
  "https://www.youtube.com/watch?v=Y7ix6RITXM0",
  "https://www.youtube.com/watch?v=sdEU-t3uEM4",
  "https://www.youtube.com/watch?v=kOCkne-Bku4",
  "https://www.youtube.com/watch?v=oxV4qrQozYo",
  "https://www.youtube.com/watch?v=_XX248bq6Pw",
  "https://www.youtube.com/watch?v=fXNdur22uQY",

];

export function getYouTubeId(url: string): string | undefined {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : undefined;
}

export const musicCollection: MusicTrack[] = rawMusicUrls.map((url, idx) => {
  const ytId = getYouTubeId(url);
  return {
    id: idx + 1,
    title: `Chill Track #${idx + 1}`,
    url,
    youtubeId: ytId,
    category: idx % 2 === 0 ? "lofi" : "viet-chill",
  };
});

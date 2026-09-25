import { defineField, defineType } from "sanity";
import { getYouTubeId } from "../youtube";

/**
 * A YouTube video embedded in a post body. Editors paste any normal YouTube
 * link; the site turns it into a privacy-enhanced (youtube-nocookie) embed.
 */
export const youtube = defineType({
  name: "youtube",
  title: "YouTube video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      description: "Paste the video's link, e.g. https://www.youtube.com/watch?v=...",
      validation: (Rule) =>
        Rule.required().custom((url) =>
          !url || getYouTubeId(url) ? true : "That doesn't look like a YouTube video link.",
        ),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional. Shown under the video and used as its accessible title.",
    }),
  ],
  preview: {
    select: { url: "url", caption: "caption" },
    prepare({ url, caption }) {
      return { title: caption || "YouTube video", subtitle: url };
    },
  },
});

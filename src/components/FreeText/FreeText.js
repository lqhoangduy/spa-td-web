import React from "react";
import sanitizeHtml from "sanitize-html";
import clsx from "clsx";
import styles from "./styles.module.scss";

const options = {
	allowedTags: [
		"address",
		"article",
		"aside",
		"footer",
		"header",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"hgroup",
		"main",
		"nav",
		"section",
		"blockquote",
		"dd",
		"div",
		"dl",
		"dt",
		"figcaption",
		"figure",
		"hr",
		"li",
		"main",
		"ol",
		"p",
		"pre",
		"ul",
		"a",
		"abbr",
		"b",
		"bdi",
		"bdo",
		"br",
		"cite",
		"code",
		"data",
		"dfn",
		"em",
		"i",
		"kbd",
		"mark",
		"q",
		"rb",
		"rp",
		"rt",
		"rtc",
		"ruby",
		"s",
		"samp",
		"small",
		"span",
		"strong",
		"sub",
		"sup",
		"time",
		"u",
		"var",
		"wbr",
		"caption",
		"col",
		"colgroup",
		"table",
		"tbody",
		"td",
		"tfoot",
		"th",
		"thead",
		"tr",
		"iframe",
		"img",
	],
	disallowedTagsMode: "discard",
	allowedAttributes: {
		a: ["href", "name", "target", "rel"],
		iframe: ["src", "frameborder"],
		img: ["src", "alt", "title"],
		span: ["style"],
	},
	selfClosing: [
		"img",
		"br",
		"hr",
		"area",
		"base",
		"basefont",
		"input",
		"link",
		"meta",
	],
	allowedSchemes: ["http", "https", "mailto"],
	allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
	allowProtocolRelative: true,
	enforceHtmlBoundary: false,
};

function FreeText({ html, className }) {
	if (!html) {
		return null;
	}

	return (
		<div
			className={clsx(styles.freeText, className)}
			dangerouslySetInnerHTML={{
				__html: sanitizeHtml(html, options),
			}}
		/>
	);
}

export default React.memo(FreeText);

"use client"

import { allPosts } from "@/.contentlayer/generated";
import BlogCard from "@/components/blog/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { compareDesc } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";

export const metadata: Metadata = {
    title: 'tygr.dev | Archived Blog',
    description: "All of my archived blog posts.",
    keywords: ["tygerxqt archived blog", "ty mason archived blog", "tygr dev archived blog", "tygr archived blog", "tyger796 archived blog", "tyger archived blog"],
}

export default function BlogPage() {
    const posts = allPosts.filter(post => post.archived === true).sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    const [query, setQuery] = useState("");

    return (
        <>
            <div className="max-w-[800px] w-full flex flex-col items-start gap-2">
                <div>
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        ~/blog/archive
                    </h2>
                    <p className="text-sm">
                        All of my archived blog posts.
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between w-full gap-2 pb-4">
                    <Input className="max-w-[400px]" placeholder="Search articles..." value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                    <Link href="/blog">
                        <Button size="sm" className="p-1">
                            <ArrowLeft />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0 sm:gap-2 sm:grid-cols-2">
                    {posts.filter((post) => post.title.toLowerCase().includes(query) || post.summary.toLowerCase().includes(query)).map((post, idx) => (
                        <BlogCard key={idx} post={post} archive={true} />
                    ))}
                </div>
            </div>
        </>
    )
}
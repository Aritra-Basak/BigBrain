import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Doc } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DocumentCard({ document }: { document: Doc<"documents"> }) {
  return (
    <Card className="relative group transition-all duration-300 hover:shadow-lg">
      <div className="absolute -top-3 -left-3 transform transition-transform duration-300 group-hover:scale-110">
        <Image
          src="/cardLogo.svg"
          width="40"
          height="40"
          alt="Card Icon"
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
      </div>

      <CardHeader className="pt-8 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl font-semibold truncate">
          {document.title}
        </CardTitle>
        <CardDescription className="h-1"></CardDescription>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <div className="min-h-[60px] text-sm sm:text-base text-gray-600">
          {!document.description ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin w-6 h-6" />
            </div>
          ) : (
            <p className="line-clamp-6">{document.description}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 sm:px-6 pb-4">
        <Button 
          asChild 
          variant="secondary" 
          className="group/button transition-colors duration-300"
        >
          <Link 
            href={`/dashboard/documents/${document._id}`}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4 transition-all duration-300 animate-blink" /> 
            <span className="text-sm sm:text-base">View</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
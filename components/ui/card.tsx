import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground overflow-hidden",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-heading font-semibold leading-tight tracking-tighter text-2xl",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDate = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs uppercase font-code", className)}
    {...props}
  />
));
CardDate.displayName = "CardDate";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm tracking-tight", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardDate,
};

// import * as React from "react";
// import Image from "next/image";
// import { formatDate } from "@/lib/utils";
// import Link from "next/link";

// const Card = ({ image, title, publishedAt, summary, slug }) => {
//   return (
//     <Link href={slug}>
//       <div className="flex flex-col rounded-xl border border-zinc-600 overflow-hidden">
//         <div className="relative aspect-[4/3]">
//           {image ? (
//             <Image
//               className="object-cover object-center"
//               src={image}
//               alt={title}
//               fill
//             />
//           ) : null}
//         </div>
//         <div className="relative aspect-[4/3] bg-zinc-200 p-6 flex flex-col">
//           {publishedAt ? (
//             <p className="font-code text-sm uppercase">
//               {formatDate(publishedAt)}
//             </p>
//           ) : null}
//           {title ? (
//             <h2 className="mt-3 text-2xl tracking-tighter leading-tight">
//               {title}
//             </h2>
//           ) : null}
//           {summary ? <p className="mt-4 tracking-tight">{summary}</p> : null}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export { Card };

import {
  IconBrandGithub,
  IconDownload,
  IconExternalLink,
  IconFileTypePdf,
  IconMessageStar,
  IconNotebook,
} from "@tabler/icons-react"

import LinkButton from "~/components/common/LinkButton"
import type { ProjectLink } from "~/content"
import { cn } from "~/lib/cn"

interface ProjectCardLinkProps {
  link: ProjectLink
  isActive: boolean
}

export default function ProjectCardLink({
  link: { type, href, part, polish },
  isActive,
}: ProjectCardLinkProps) {
  const { label, Icon } = {
    repository: { label: "Repository", Icon: IconBrandGithub },
    livedemo: { label: "Live Demo", Icon: IconExternalLink },
    documentation: { label: "Documentation", Icon: IconNotebook },
    download: { label: "Download", Icon: IconDownload },
    publication: { label: "Publication", Icon: IconFileTypePdf },
    blogpost: { label: "Blog Post", Icon: IconMessageStar },
  }[type]

  return (
    <li>
      <LinkButton
        action={href}
        className={cn("w-full gap-2 px-4 py-2", isActive && "opacity-10 hover:opacity-100")}
      >
        <Icon role="presentation" /> {label + (part ? ` – ${part}` : "") + (polish ? " (PL)" : "")}
      </LinkButton>
    </li>
  )
}

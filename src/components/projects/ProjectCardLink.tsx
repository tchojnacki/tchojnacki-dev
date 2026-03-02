import {
  IconBrandGithub,
  IconCertificate,
  IconDownload,
  IconExternalLink,
  IconMessageStar,
  IconNotebook,
  IconSchool,
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
    thesis: { label: "Thesis", Icon: IconSchool },
    research: { label: "Research Paper", Icon: IconCertificate },
    blogpost: { label: "Blog Post", Icon: IconMessageStar },
  }[type]

  return (
    <li>
      <LinkButton
        action={href}
        className={cn("w-full gap-2 px-4 py-2", isActive && "opacity-10 hover:opacity-100")}
      >
        <Icon role="presentation" />
        <span>
          {label + (part ? ` – ${part}` : "")}{" "}
          {polish ? <small className="text-xs">(PL)</small> : null}
        </span>
      </LinkButton>
    </li>
  )
}

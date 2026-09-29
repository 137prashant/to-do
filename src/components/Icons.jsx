/** Consistent icon sizing — always shrink-0 so flex layouts don't stretch SVGs */
function Svg({ className = 'h-5 w-5', children, viewBox = '0 0 24 24', strokeWidth = 1.75 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      {children}
    </svg>
  )
}

export function IconSearch({ className = 'h-[18px] w-[18px]' }) {
  return (
    <Svg className={className} strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
    </Svg>
  )
}

export function IconCheck({ className = 'h-3.5 w-3.5' }) {
  return (
    <Svg className={className} strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
    </Svg>
  )
}

export function IconTrash({ className = 'h-[18px] w-[18px]' }) {
  return (
    <Svg className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 4v7m4-7v7M6 7l1 12a1 1 0 001 1h8a1 1 0 001-1l1-12" />
    </Svg>
  )
}

export function IconEdit({ className = 'h-[18px] w-[18px]' }) {
  return (
    <Svg className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4 11.5-11.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l5 5" />
    </Svg>
  )
}

export function IconClose({ className = 'h-5 w-5' }) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </Svg>
  )
}

export function IconBack({ className = 'h-5 w-5' }) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </Svg>
  )
}

export function IconClock({ className = 'h-4 w-4' }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" />
      <path strokeLinecap="round" d="M12 8v4l2.5 2.5" />
    </Svg>
  )
}

export function IconCalendar({ className = 'h-4 w-4' }) {
  return (
    <Svg className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path strokeLinecap="round" d="M8 3v4M16 3v4M4 10h16" />
    </Svg>
  )
}

export function IconPlus({ className = 'h-7 w-7' }) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function IconTaskComplete({ className = 'h-5 w-5' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      fill="currentColor"
    >
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </svg>
  )
}

export function IconTaskPending({ className = 'h-5 w-5' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      fill="currentColor"
    >
      <path d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7a1 1 0 10-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 101.4 1.4L12 13.4l4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z" />
    </svg>
  )
}

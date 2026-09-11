# UIDAI Home Behaviors

- Header is fixed at the top, white primary bar with a dark accessibility strip. Computed header: `position: fixed`, `z-index: 1300`, `height: 192.047px`, `box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px`, `transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)`.
- Desktop navigation uses hoverable menu labels with icons: Home, My Aadhaar, About UIDAI, Build with Us, Media, Documents, Help.
- Hero is a time/click-driven carousel on the source. The visible captured state shows `Update your mobile number. No queues.` with pill pagination. Clone implements the same visual state plus carousel dots.
- Cards and buttons have hover affordances: borders/shadows deepen, arrows/buttons darken, cards lift subtly. Source uses Material transitions; clone uses `transition-all duration-200`.
- Help FAQ is click-driven accordion in the source. Clone renders the visible first FAQ expanded and the remaining questions collapsed.
- Videos are static thumbnail cards with centered play icons unless clicked. Real video playback is out of scope.
- Mobile collapses navigation into a hamburger row, stacks cards, narrows the fixed header, and keeps the same vertical ordering.

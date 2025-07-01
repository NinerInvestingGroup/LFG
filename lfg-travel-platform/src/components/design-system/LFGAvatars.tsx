import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"

export function LFGAvatars() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Avatar Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Avatar Sizes</h3>
          <div className="flex items-end gap-6">
            <div className="text-center space-y-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/images/avatars/user1.jpg" alt="User" />
                <AvatarFallback className="text-xs">U</AvatarFallback>
              </Avatar>
              <p className="text-xs text-neutral-600">24px</p>
            </div>

            <div className="text-center space-y-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/images/avatars/user2.jpg" alt="User" />
                <AvatarFallback className="text-sm">U</AvatarFallback>
              </Avatar>
              <p className="text-xs text-neutral-600">32px</p>
            </div>

            <div className="text-center space-y-2">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/avatars/user3.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <p className="text-xs text-neutral-600">48px</p>
            </div>

            <div className="text-center space-y-2">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/images/avatars/user4.jpg" alt="User" />
                <AvatarFallback className="text-lg">U</AvatarFallback>
              </Avatar>
              <p className="text-xs text-neutral-600">64px</p>
            </div>
          </div>
        </div>

        {/* Avatar with Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Avatar with Status</h3>
          <div className="flex gap-6">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/avatars/online-user.jpg" alt="Online User" />
                <AvatarFallback>ON</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white"></div>
            </div>

            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/avatars/away-user.jpg" alt="Away User" />
                <AvatarFallback>AW</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white"></div>
            </div>

            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/avatars/offline-user.jpg" alt="Offline User" />
                <AvatarFallback>OF</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neutral-400 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Avatar Group */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Avatar Group</h3>
          <div className="flex -space-x-2">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src="/images/avatars/group1.jpg" alt="User 1" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src="/images/avatars/group2.jpg" alt="User 2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src="/images/avatars/group3.jpg" alt="User 3" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <Avatar className="w-10 h-10 border-2 border-white bg-neutral-100">
              <AvatarFallback className="text-sm text-neutral-600">+5</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Avatar with Badge */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Avatar with Badge</h3>
          <div className="flex gap-6">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/avatars/leader.jpg" alt="Trip Leader" />
                <AvatarFallback>TL</AvatarFallback>
              </Avatar>
              <Badge className="absolute -top-1 -right-1 bg-secondary text-white text-xs px-1">Leader</Badge>
            </div>

            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/images/avatars/verified.jpg" alt="Verified User" />
                <AvatarFallback>VU</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
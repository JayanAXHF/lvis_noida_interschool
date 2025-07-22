'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '~/components/ui/input-otp'
import { cn } from '~/lib/utils'

interface CircularTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  strokeWidth?: number
}

const CircularTimer = React.forwardRef<HTMLDivElement, CircularTimerProps>(
  ({ className, size = 400, strokeWidth = 15, ...props }, ref) => {
    const [initialTime, setInitialTime] = React.useState(300)
    const [time, setTime] = React.useState(initialTime)
    const [isRunning, setIsRunning] = React.useState(false)
    const [otpValue, setOtpValue] = React.useState('')
    const audioRef = React.useRef<HTMLAudioElement>(null)

    React.useEffect(() => {
      if (time === 0) {
        setIsRunning(false)
      }
      if (!isRunning || time === 0) {
        if (audioRef.current) {
          audioRef.current.pause()
        }
        return
      }
      if (!/^(?:[01]\d|2[0-3])[0-5]\d$/.test(otpValue)) {
        setIsRunning(false)
        toast.error('Invalid Time Value')
      }

      if (audioRef.current) {
        audioRef.current.play()
      }
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
        setOtpValue(
          String(Math.floor(time / 60)).padStart(2, '0') +
            String((time - 1) % 60).padStart(2, '0'),
        )
      }, 1000)

      return () => clearInterval(interval)
    }, [isRunning, time])

    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset =
      circumference - (time / initialTime) * circumference

    const handleTimeChange = (value: string) => {
      if (/^\d{0,4}$/.test(value)) {
        setOtpValue(value)
        const mins = Math.min(
          Number.parseInt(value.substring(0, 2), 10) || 0,
          59,
        )
        const secs = Math.min(
          Number.parseInt(value.substring(2, 4), 10) || 0,
          59,
        )
        const totalSeconds = mins * 60 + secs

        if (!isNaN(totalSeconds)) {
          setInitialTime(totalSeconds)
          setTime(totalSeconds)
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col items-center justify-center',
          className,
        )}
        {...props}
      >
        <div
          style={{ width: size, height: size }}
          className="relative flex flex-col items-center justify-center"
        >
          <svg width={size} height={size} className="absolute">
            <circle
              stroke="var(--muted)"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />
            <circle
              stroke="var(--primary)"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              className="-rotate-90 origin-center transform-gpu transition-all duration-300"
            />
          </svg>
          <div className="z-10">
            <InputOTP
              maxLength={4}
              value={
                isRunning
                  ? `${String(Math.floor(time / 60)).padStart(2, '0')}${String(
                      time % 60,
                    ).padStart(2, '0')}`
                  : otpValue
              }
              onChange={handleTimeChange}
              disabled={isRunning}
            >
              <InputOTPGroup className="font-bold text-5xl tabular-nums">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator className="text-3xl">:</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <div className="z-10 mt-6 flex items-center gap-4">
          <Button
            size="lg"
            className="w-32"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-32"
            onClick={() => {
              setIsRunning(false)
              setTime(initialTime)
              setOtpValue(
                `${String(Math.floor(initialTime / 60)).padStart(2, '0')}${String(
                  initialTime % 60,
                ).padStart(2, '0')}`,
              )
            }}
          >
            Reset
          </Button>
        </div>
        <audio
          ref={audioRef}
          src="/mindfulness-relaxation-amp-meditation-music-22174.mp3"
        />
      </div>
    )
  },
)
CircularTimer.displayName = 'CircularTimer'

export { CircularTimer }

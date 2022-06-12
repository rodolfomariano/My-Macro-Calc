import { Warning } from "phosphor-react";
import { HTMLAttributes, HTMLProps } from "react";

import styles from './styles.module.scss'

interface WarningMessage {
  position?: 'center' | 'end' | 'start'
  iconPosition?: 'center' | 'end' | 'start'
  message: string
}

export function WarningMessage({ message, position = 'center', iconPosition = 'start' }: WarningMessage) {

  return (
    <strong
      className={`${styles.container} ${position === 'center'
        ? styles.center
        : position === 'start'
          ? styles.start
          : styles.end
        }
        ${iconPosition === 'center'
          ? styles.IconPositionCenter
          : iconPosition === 'start'
            ? styles.IconPositionStart
            : styles.IconPositionEnd
        }
        `}
    >
      <Warning
        size={20}
      />
      <p>
        {message}
      </p>

    </strong>
  )
}
import classNames from "classnames";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  slugProps: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, slugProps, availableAt, type }: LessonProps) {
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEE' • ' d 'de' MMMM' • 'k'h':mm",
    {
      locale: ptBR,
    }
  );

  const { slug } = useParams<{ slug: string }>();

  const isActiveLesson = slug === slugProps;

  return (
    <Link to={`/event/lesson/${slugProps}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500 border-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm text-blue-500 font-medium flex items-center gap-2",
                {
                  "text-white": isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className="text-sm text-orange-500 font-medium flex
              items-center gap-2"
            >
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={classNames(
              "text-xs rounded px-2 py-[0.125rem] text-white border border-green-300",
              {
                "border-white": isActiveLesson,
              }
            )}
          >
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classNames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}

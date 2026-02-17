@echo off
chcp 65001 > nul
echo ========================================
echo Отправка проектов в GitHub
echo ========================================
echo.
echo Репозиторий: https://github.com/TArakelyan/vibe-coding
echo.
echo Начинаю отправку...
echo.

echo Очистка репозитория от больших файлов...
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch '*.zip'" --prune-empty --tag-name-filter cat -- --all
echo.
echo Сжатие репозитория...
git reflog expire --expire=now --all
git gc --prune=now --aggressive
echo.
echo Отправка в GitHub...
git push origin master --force --verbose

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ УСПЕШНО! Все проекты отправлены!
    echo ========================================
    echo.
    echo Откройте: https://github.com/TArakelyan/vibe-coding
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ ОШИБКА при отправке
    echo ========================================
    echo.
    echo Попробуйте:
    echo 1. Проверьте интернет соединение
    echo 2. Войдите в GitHub через браузер
    echo 3. Запустите этот файл снова
    echo.
)

pause
